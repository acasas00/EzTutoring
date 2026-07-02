from app.dao.homepage_dao import (
    update_homepage_image,
    get_homepage_images
)


def upload_homepage_picture(section: str, image_url: str):

    updated = update_homepage_image(section, image_url)

    if not updated:
        raise ValueError("Homepage image not updated")

    return updated


def display_homepage_images():

    rows = get_homepage_images()

    return {
        row["section"]: row["image_url"]
        for row in rows
    }