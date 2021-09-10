from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    username = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    employer_id = db.Column(db.Integer, db.ForeignKey('employer.id'))
    # employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    messages_id = db.Column(db.Integer, db.ForeignKey('messages.id'))
    employee_id = db.relationship("Employee", uselist=False, backref="profile")

    def __repr__(self):
        return '<Profile %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "username": self.username,
            "email": self.email,
            # do not serialize the password, its a security breach
        }


class Messages(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, unique=False, nullable=False)
    recipient_id = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<Messages %r>' % self.message

    def serialize(self):
        return {
            "id": self.id
        }


class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(120), unique=False, nullable=False)
    hourly_rate = db.Column(db.Float, unique=False, nullable=False)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    
    def __repr__(self):
        if self.profile is None:
            return self.id
        else:
            return self.profile.name

    def serialize(self):
        return {
            "id": self.id,
            "role": self.role,
            "hourly_rate": self.hourly_rate
        }


class Employer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(120), unique=False, nullable=False)
    hourly_rate = db.Column(db.Float, unique=False, nullable=False)

    def __repr__(self):
        return '<Employer %r>' % self.employer

    def serialize(self):
        return {
            "id": self.id,
            "role": self.role,
            "hourly_rate": self.hourly_rate
        }


class Request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer, unique=False, nullable=False)
    employee_id = db.Column(db.Integer, unique=False, nullable=False)
    shift_id = db.Column(db.Integer, unique=False, nullable=False)
    status = db.Column(db.String(50), unique=False, nullable=False)

    def __repr__(self):
        return '<Request %r>' % self.request

    def serialize(self):
        return {
            "id": self.id
        }


class Shift(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(40), unique=False, nullable=False)
    hours = db.Column(db.String(50), unique=False, nullable=False)
    role = db.Column(db.String(120), unique=False, nullable=False)
    starting_time = db.Column(db.Integer, unique=False, nullable=False)
    ending_time = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<Shift %r>' % self.shift

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "hours": self.hours,
            "role": self.role,
            "starting_time": self.starting_time,
            "ending_time": self.ending_time
            # do not serialize the password, its a security breach
        }


class Punch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    shift_id = db.Column(db.String(120), unique=False, nullable=False)
    employee_id = db.Column(db.String(120), unique=False, nullable=False)
    time_stamp = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<Punch %r>' % self.punch

    def serialize(self):
        return {
            "id": self.id
        }