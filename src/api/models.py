from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    last_name = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    employer_id = db.Column(db.ForeignKey('employer.id'), primary_key=True)
    employee_id = db.Column(db.ForeignKey('employee.id'), primary_key=True)
    messages_id = db.Column(db.ForeignKey('messages.id'), primary_key=True)
    # user_id = db.Column(db.ForeignKey('user.id'), primary_key=True)


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

