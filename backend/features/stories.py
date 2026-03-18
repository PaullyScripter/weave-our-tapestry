from sqlalchemy.orm import Session
from ..database.model import Story

def list_all_stories(db: Session):
    return db.query(Story).all()

def get_story_by_id(db: Session, story_id: int):
    return db.query(Story).filter(Story.id == story_id).first()

def create_new_story(db: Session, payload):
    story = Story(
        title = payload.title,
        culture = payload.culture,
        text = payload.text,
    )
    db.add(story)
    db.commit()
    db.refresh(story)
    return story



