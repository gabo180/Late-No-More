from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref

db = SQLAlchemy()

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    username = db.Column(db.String(120), unique=False, nullable=False)
    phone_number = db.Column(db.String(35), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    employee = db.relationship("Employee", backref="profile", uselist=False)
    employer = db.relationship("Employer", backref="profile", uselist=False)
    messages_author = db.relationship('Messages_author', backref="author", lazy=True)
    messages_recipient = db.relationship('Messages_recipient', backref="recipient", lazy=True)
    

    def __repr__(self):
        return '<Profile %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "username": self.username,
            "email": self.email,
            "phone_number": self.phone_number
        }

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(120), unique=False, nullable=False)
    hourly_rate = db.Column(db.Float, unique=False, nullable=False)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    request_employee = db.relationship("Request", back_populates="employee")
    shift = db.relationship('Shift', backref="role", lazy=True)
    
    def __repr__(self):
        return self.role
        # if self.profile_id is None:
        #     return self.id
        # else:
        #     return self.profile_id.name

    def serialize(self):
        return {
            "id": self.id,
            "role": self.role,
            "hourly_rate": self.hourly_rate
        }


class Messages_author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, unique=False, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    

    def __repr__(self):
        return '<Messages_author %r>' % self.id

    def serialize(self):
        return {
            "id": self.id
        }

class Messages_recipient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, unique=False, nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    

    def __repr__(self):
        return '<Messages_recipient %r>' % self.id

    def serialize(self):
        return {
            "id": self.id
        }


class Employer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    request_employer = db.relationship("Request", back_populates="employer")
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    

    def __repr__(self):
        return '<Employer %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "role": self.role,
            "hourly_rate": self.hourly_rate
        }


class Request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.ForeignKey('employer.id'), primary_key=True)
    employee_id = db.Column(db.ForeignKey('employee.id'), primary_key=True)
    shift_id = db.Column(db.ForeignKey('shift.id'), primary_key=True)
    employer = db.relationship("Employer", back_populates="request_employer")
    employee = db.relationship("Employee", back_populates="request_employee")
    shift = db.relationship("Shift", back_populates="request_shift")
    status = db.Column(db.String(50), unique=False, nullable=False)

    def __repr__(self):
        return '<Request %r>' % self.shift_id

    def serialize(self):
        return {
            "id": self.id
        }


class Shift(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hours = db.Column(db.Integer, unique=False, nullable=True)
    role_id = db.Column(db.Integer, db.ForeignKey("employee.id"))
    starting_time = db.Column(db.DateTime(timezone=True), unique=False, nullable=False)
    ending_time = db.Column(db.DateTime(timezone=True), unique=False, nullable=False)
    clock_in = db.Column(db.DateTime(timezone=True), unique=False, nullable=True)
    clock_out = db.Column(db.DateTime(timezone=True), unique=False, nullable=True)
    request_shift = db.relationship("Request", back_populates="shift")


    def __repr__(self):
        return '<Shift %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            
            "hours": self.hours,
            "clock_in": self.clock_in, 
            "clock_out": self.clock_out,
            "role_id": self.role_id,
            "starting_time": self.starting_time,
            "ending_time": self.ending_time
        }
