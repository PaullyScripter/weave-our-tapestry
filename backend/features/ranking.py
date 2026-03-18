"""
Ranking Search Feature
File Description: search which results appear first

Objectives:
-frequency: kewords, views
-tie breakers
-popularity

Note: keep simple for now
"""

""" 
from typing import List, Dict, Any

def rank_results(results: List[Dict[str, Any]], sort: str) -> List[Dict[str, Any]]:
    
    if sort == "newest":
        return sorted(results, key=lambda r: r.get("id", 0), reverse=True)

    elif sort == "views":
        return sorted(results, key=lambda r: r.get("views", 0), reverse=True)

    elif sort == "frequency":
        # number of keyword matches
        return sorted(results, key=lambda r: r.get("frequency", 0), reverse=True)

    elif sort == "popularity":
        # simple popularity formula
        return sorted(
            results,
            key=lambda r: (
                r.get("views", 0) * 0.7 +
                r.get("frequency", 0) * 0.3
            ),
            reverse=True
        )

    else:
        # default ranking: frequency first, then views as tie breaker
        return sorted(
            results,
            key=lambda r: (
                r.get("frequency", 0),
                r.get("views", 0)
            ),
            reverse=True
        )

  """