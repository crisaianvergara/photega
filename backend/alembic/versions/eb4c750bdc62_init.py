"""init

Revision ID: eb4c750bdc62
Revises:
Create Date: 2025-06-07 16:34:32.785800

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = "eb4c750bdc62"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_user_email"), table_name="user")
    op.drop_table("user")
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "user",
        sa.Column("id", sa.UUID(), autoincrement=False, nullable=False),
        sa.Column("email", sa.VARCHAR(length=320), autoincrement=False, nullable=False),
        sa.Column(
            "hashed_password",
            sa.VARCHAR(length=1024),
            autoincrement=False,
            nullable=False,
        ),
        sa.Column("is_active", sa.BOOLEAN(), autoincrement=False, nullable=False),
        sa.Column("is_superuser", sa.BOOLEAN(), autoincrement=False, nullable=False),
        sa.Column("is_verified", sa.BOOLEAN(), autoincrement=False, nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("user_pkey")),
    )
    op.create_index(op.f("ix_user_email"), "user", ["email"], unique=True)
    # ### end Alembic commands ###
