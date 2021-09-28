from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref

db = SQLAlchemy()

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    phone_number = db.Column(db.String(35), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    working_for = db.Column(db.String(80), unique=False, nullable=True)
    employee = db.relationship("Employee", backref="profile", uselist=False)
    shift = db.relationship('Shift', backref="profile", lazy=True)
    employer = db.Column(db.String(100), db.ForeignKey('employer.company_name'))
    messages_author = db.relationship('Messages_author', backref="author", lazy=True)
    messages_recipient = db.relationship('Messages_recipient', backref="recipient", lazy=True)
    

    def __repr__(self):
        return self.username

    def serialize(self):
        
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "username": self.username,
            "email": self.email,
            "phone_number": self.phone_number,
            "employer": self.employer,
            "working_for": self.working_for
        }

class Employer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(120), unique=True, nullable=False)
    request_employer = db.relationship("Request", back_populates="employer", lazy=True)
    employee = db.relationship("Employee", backref="working for")
    profile_id = db.relationship("Profile", backref="Company name", uselist=False)
    shift = db.relationship('Shift', backref="company name", lazy=True)
    

    def __repr__(self):
        return self.company_name

    def serialize(self):
        return {
            "id": self.id,
            "company_name": self.company_name
        }

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(120), unique=False, nullable=False)
    hourly_rate = db.Column(db.Float, unique=False, nullable=False)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    employer_id = db.Column(db.String(100), db.ForeignKey('employer.company_name'))
    request_employee = db.relationship("Request", back_populates="employee")
    shift = db.relationship('Shift', backref="role", lazy=True)
    
    def __repr__(self):
        return self.role

    def serialize(self):
        return {
            "id": self.id,
            "role": self.role,
            "hourly_rate": self.hourly_rate,
            "profile_id": self.profile_id,
            "employer_id": self.employer_id
        }

class Shift(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'))
    role_id = db.Column(db.Integer, db.ForeignKey("employee.id"))
    employer_id = db.Column(db.String(100), db.ForeignKey("employer.company_name"))
    starting_time = db.Column(db.String(100), unique=False, nullable=False)
    ending_time = db.Column(db.String(100), unique=False, nullable=False)
    clock_in = db.Column(db.DateTime(timezone=True), unique=False, nullable=True)
    clock_out = db.Column(db.DateTime(timezone=True), unique=False, nullable=True)
    request_shift = db.relationship("Request", back_populates="shift")


    def __repr__(self):
        return '<Shift %r>' % self.profile_id

    def serialize(self):
        return {
            "id": self.id,
            "clock_in": self.clock_in,
            "clock_out": self.clock_out,
            "role_id": self.role_id,
            "starting_time": self.starting_time,
            "ending_time": self.ending_time,
            "profile_id": self.profile_id,
            "employer_id": self.employer_id
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
            "id": self.id,
            "status": self.status
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