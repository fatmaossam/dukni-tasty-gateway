#!/usr/bin/env python3
"""
CLI to convert all currencies to Egyptian Pound (EGP).

Fetches live FX rates from exchangerate.host with base=EGP, then inverts the
rates to get EGP per 1 unit of each foreign currency. Prints a formatted table
or writes CSV.
"""

from __future__ import annotations

import argparse
import csv
import json
import sys
from dataclasses import dataclass
from typing import Dict, Iterable, List, Tuple

try:
    from urllib.request import urlopen
    from urllib.error import URLError, HTTPError
except Exception:  # pragma: no cover
    urlopen = None  # type: ignore
    URLError = Exception  # type: ignore
    HTTPError = Exception  # type: ignore


# Reliable free endpoint providing base currency rates
API_URL = "https://open.er-api.com/v6/latest/EGP"


@dataclass(frozen=True)
class Conversion:
    currency_code: str
    egp_per_unit: float


def fetch_rates(timeout_seconds: float) -> Dict[str, float]:
    if urlopen is None:
        raise RuntimeError("urllib is unavailable in this environment")

    try:
        with urlopen(API_URL, timeout=timeout_seconds) as response:  # nosec B310
            if response.status != 200:
                raise RuntimeError(f"HTTP {response.status} when fetching rates")
            content_bytes = response.read()
    except HTTPError as exc:  # type: ignore[name-defined]
        raise RuntimeError(f"HTTP error fetching rates: {exc}") from exc
    except URLError as exc:  # type: ignore[name-defined]
        raise RuntimeError(f"Network error fetching rates: {exc}") from exc

    try:
        payload = json.loads(content_bytes.decode("utf-8"))
    except json.JSONDecodeError as exc:
        raise RuntimeError("Failed to parse rates JSON") from exc

    # open.er-api.com schema: { "result": "success", "base_code": "EGP", "rates": { ... } }
    if not isinstance(payload, dict):
        raise RuntimeError("Unexpected response schema from API")

    if payload.get("result") != "success":
        message = payload.get("error-type") or payload.get("message") or "API returned non-success result"
        raise RuntimeError(str(message))

    rates = payload.get("rates")
    if not isinstance(rates, dict):
        raise RuntimeError("Unexpected rates schema from API")

    filtered: Dict[str, float] = {}
    for code, value in rates.items():
        if not isinstance(code, str):
            continue
        try:
            numeric_value = float(value)
        except (TypeError, ValueError):
            continue
        filtered[code.upper()] = numeric_value
    return filtered


def compute_conversions(rates_per_egp: Dict[str, float], amount: float) -> List[Conversion]:
    conversions: List[Conversion] = []
    conversions.append(Conversion("EGP", egp_per_unit=amount))
    for code, per_egp in rates_per_egp.items():
        if per_egp <= 0:
            continue
        egp_per_unit = amount * (1.0 / per_egp)
        conversions.append(Conversion(code, egp_per_unit))
    conversions.sort(key=lambda c: c.currency_code)
    return conversions


def print_table(conversions: Iterable[Conversion]) -> None:
    code_header = "Currency"
    value_header = "EGP per 1 unit"
    rows: List[Tuple[str, str]] = []
    for c in conversions:
        rows.append((c.currency_code, f"{c.egp_per_unit:,.6f}"))

    max_code_width = max(len(code_header), *(len(code) for code, _ in rows))
    max_val_width = max(len(value_header), *(len(val) for _, val in rows))

    header = f"{code_header:<{max_code_width}}  {value_header:>{max_val_width}}"
    sep = f"{'-' * max_code_width}  {'-' * max_val_width}"
    print(header)
    print(sep)
    for code, val in rows:
        print(f"{code:<{max_code_width}}  {val:>{max_val_width}}")


def write_csv(conversions: Iterable[Conversion], file_path: str) -> None:
    output_stream = sys.stdout if file_path == "-" else open(file_path, "w", newline="", encoding="utf-8")
    close_when_done = file_path != "-"
    try:
        writer = csv.writer(output_stream)
        writer.writerow(["currency", "egp_per_unit"])
        for c in conversions:
            writer.writerow([c.currency_code, f"{c.egp_per_unit:.8f}"])
    finally:
        if close_when_done:
            output_stream.close()


def parse_args(argv: List[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Convert all currencies to Egyptian Pound (EGP)")
    parser.add_argument("--amount", type=float, default=1.0, help="Amount of each foreign currency to convert to EGP (default: 1.0)")
    parser.add_argument("--timeout", type=float, default=10.0, help="HTTP timeout in seconds (default: 10)")
    parser.add_argument("--csv", dest="csv_path", default=None, help="Write CSV to this path, or '-' for stdout")
    return parser.parse_args(argv)


def main(argv: List[str]) -> int:
    args = parse_args(argv)
    try:
        rates_per_egp = fetch_rates(timeout_seconds=args.timeout)
    except Exception as exc:
        sys.stderr.write(f"Error: {exc}\n")
        return 2

    conversions = compute_conversions(rates_per_egp, amount=args.amount)

    if args.csv_path:
        try:
            write_csv(conversions, args.csv_path)
        except Exception as exc:
            sys.stderr.write(f"Failed writing CSV: {exc}\n")
            return 3
    else:
        print_table(conversions)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))

