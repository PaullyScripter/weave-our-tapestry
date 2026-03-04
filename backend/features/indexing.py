"""
Index Search Feature
File Description: builds the “index” for searching

Objectives:
- build index from DB stories: word -> list of story IDs
-update index when new story is added
-persistence/caching
"""

from typing import Dict, Set, List

def build_inverted_index(stories: List[dict]) -> Dict[str, Set[int]]:
    #TODO: implement the goals
    return{}