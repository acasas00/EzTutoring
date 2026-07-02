from app.dao.settings_dao import (
    get_settings,
    update_setting
)


def display_settings():

    rows = get_settings()

    return {
        row["setting_name"]: row["setting_value"]
        for row in rows
    }


def change_setting(setting_name: str, setting_value: bool):

    updated = update_setting(
        setting_name,
        setting_value
    )

    if not updated:
        raise ValueError("Setting not found")

    return updated