# photega

## POETRY

- poetry env info --path
- source <path>/bin/activate
- to select interpreter:
  - enter path
  - <path>/bin/python

## ALEMBIC

- alembic init -t async alembic
- alembic revision --autogenerate -m <message>
- alembic stamp head
- alembic upgrade head

## React-TS

- npm create vite@latest .
- npm i react-router
- npm i axios

## GIT

- git rm --cached frontend/.env

## PRE-COMMIT

- https://pre-commit.com/

## PRETTIER

- https://andrebnassis.medium.com/setting-prettier-on-a-react-typescript-project-2021-f9f0d5a1d6b0
- npx prettier --write .

## BLACK

- https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter
- black .

## CHECK GIT TAGS

- git ls-remote --tags <hooks_repo_url>
