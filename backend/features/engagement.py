"""
Description: Handle "user engagement" actions like views, likes, ratings, comments.

Goals: 
- increment story views
- (later) likes, comments count, rating average
"""

from sqlalchemy.orm import Session
from database.model import Story

def increment_story_views(db: Session, story_id: int) -> Story | None:

    #TODO: query story by ID
    story = db.query(Story).filter(Story.id == story_id).first()
    if story is None:
        return None
    
    #TODO: increment views
    story.views = (story.views or 0 ) + 1

    #TODO: commit and fresh for new views
    db.commit()
    db.refresh(story)
    return story
