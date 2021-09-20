"""empty message

Revision ID: d37c627cde49
Revises: 
Create Date: 2021-09-18 21:22:08.156598

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd37c627cde49'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('profile',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('last_name', sa.String(length=120), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=False),
    sa.Column('phone_number', sa.String(length=35), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('phone_number')
    )
    op.create_table('shift',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('hours', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(length=120), nullable=False),
    sa.Column('starting_time', sa.DateTime(), nullable=False),
    sa.Column('ending_time', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('employee',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(length=120), nullable=False),
    sa.Column('hourly_rate', sa.Float(), nullable=False),
    sa.Column('profile_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['profile_id'], ['profile.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('employer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('profile_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['profile_id'], ['profile.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('messages_author',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('body', sa.Text(), nullable=False),
    sa.Column('author_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['author_id'], ['profile.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('messages_recipient',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('body', sa.Text(), nullable=False),
    sa.Column('recipient_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['recipient_id'], ['profile.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('shift',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('hours', sa.Integer(), nullable=False),
    sa.Column('role_id', sa.Integer(), nullable=True),
    sa.Column('starting_time', sa.DateTime(), nullable=False),
    sa.Column('ending_time', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['role_id'], ['employee.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('punch',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('time_stamp', sa.DateTime(), nullable=False),
    sa.Column('shift_id', sa.Integer(), nullable=True),
    sa.Column('employee_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['employee_id'], ['employee.id'], ),
    sa.ForeignKeyConstraint(['shift_id'], ['shift.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('request',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('employer_id', sa.Integer(), nullable=False),
    sa.Column('employee_id', sa.Integer(), nullable=False),
    sa.Column('shift_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['employee_id'], ['employee.id'], ),
    sa.ForeignKeyConstraint(['employer_id'], ['employer.id'], ),
    sa.ForeignKeyConstraint(['shift_id'], ['shift.id'], ),
    sa.PrimaryKeyConstraint('id', 'employer_id', 'employee_id', 'shift_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('request')
    op.drop_table('punch')
    op.drop_table('shift')
    op.drop_table('messages_recipient')
    op.drop_table('messages_author')
    op.drop_table('employer')
    op.drop_table('employee')
    op.drop_table('profile')
    # ### end Alembic commands ###
