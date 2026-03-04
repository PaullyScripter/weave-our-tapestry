"""
Ranking Search Feature
File Description: search which results appear first

Objectives:
-frequency: kewords, views
-tie breakers
-popularity

Note: keep simple for now
"""

from typing import List, Dict, Any
 
def rank_results(results: List[Dict[str, Any]], sort: str) -> List[Dict[str, Any]]:
    if sort == "newest":
      return sorted(results, key = lambda r: r.get("id", 0), reverse  = True)
    #views
    return sorted(results , key = lambda r: r.get("views", 0), reverse = True)
