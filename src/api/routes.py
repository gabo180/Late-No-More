"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Profile, Punch, Messages_author, Messages_recipient, Shift, Employee
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import datetime
from api.emailSender import emailSender

api = Blueprint('api', __name__)

##Profile

@api.route('/profile', methods=['GET'])
@jwt_required()
def handle_profile():
    profiles = Profile.query.all()
    mapped_profiles=[p.serialize() for p in profiles]
    return jsonify(mapped_profiles), 200

@api.route('/profile/<int:profile_id>', methods=['GET'])
@jwt_required()
def handle_single_profile(profile_id):
    profiles = Profile.query.get(profile_id)
    profiles = profiles.serialize()
    return jsonify(profiles), 200

@api.route('/profile', methods=['POST'])
def post_profile():
    profile1 = Profile(name="my_super_name", last_name="my_super_last_name", username="my_super_height", email="my_super_weight", phone_number="000-000-0000")
    db.session.add(profile1)
    db.session.commit()
    return jsonify(profile1.serialize())

##Messages author

@api.route('/messages-author', methods=['GET'])
@jwt_required()
def handle_messages_author():
    messages = Messages_author.query.all()
    mapped_messages=[m.serialize() for m in messages]
    return jsonify(mapped_messages), 200

@api.route('/messages-author/<int:messages_id>', methods=['GET'])
@jwt_required()
def handle_single_message_author(messages_id):
    messages = Messages_author.query.get(messages_id)
    messages = messages.serialize()
    return jsonify(messages), 200

##Messages recipient

@api.route('/messages-recipient', methods=['GET'])
@jwt_required()
def handle_messages_recipient():
    messages = Messages_recipient.query.all()
    mapped_messages=[m.serialize() for m in messages]
    return jsonify(mapped_messages), 200

@api.route('/messages-recipient/<int:messages_id>', methods=['GET'])
@jwt_required()
def handle_single_message_recipient(messages_id):
    messages = Messages_recipient.query.get(messages_id)
    messages = messages.serialize()
    return jsonify(messages), 200

##Shift

@api.route('/shift', methods=['GET'])
@jwt_required()
def handle_shift():
    shifts = Shift.query.all()
    mapped_shifts=[s.serialize() for s in shifts]
    return jsonify(mapped_shifts), 200

@api.route('/shift/<int:shift_id>', methods=['GET'])
@jwt_required()
def handle_single_shift(shift_id):
    shifts = Shift.query.get(shift_id)
    shifts = shifts.serialize()
    return jsonify(shifts), 200

##Punch

@api.route('/punch', methods=['GET'])
@jwt_required()
def handle_punch():
    punches = Punch.query.all()
    mapped_punches=[s.serialize() for s in punches]
    return jsonify(mapped_punches), 200

@api.route('/punch/<int:punch_id>', methods=['GET'])
@jwt_required()
def handle_single_punch(punch_id):
    punches = Punch.query.get(punch_id)
    punches = punches.serialize()
    return jsonify(punches), 200

##Employee

@api.route('/employee', methods=['GET'])
@jwt_required()
def handle_employee():
    employees = Employee.query.all()
    mapped_employees=[p.serialize() for p in employees]
    return jsonify(mapped_employees), 200

@api.route('/employee/<int:employee_id>', methods=['GET'])
@jwt_required()
def handle_single_employee(employee_id):
    employees = Employee.query.get(employee_id)
    employees = employees.serialize()
    return jsonify(employees), 200

@api.route('/employee', methods=['PUT'])
def update_employee(employee_id):
    employee1 = Employee.query.get(employee_id)
    if employee1 is None:
        raise APIException('User not found', status_code=404)

    if "role" in body:
        employee1.username = body["role"]
    db.session.commit()
    return jsonify(employee1.serialize())

##Login

@api.route("/login", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    # Query your database for username and password
    user = Profile.query.filter_by(username=username, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    # create a new token with the user id inside
    emailSender(user.email)
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })


##POST Shift

@api.route('/shift', methods=['POST'])
def post_shift():
    body = request.get_json()
    shift = Shift(
        hours=body["hours"], 
        role=body["role"],
        starting_time=datetime.datetime.now(),
        ending_time=datetime.datetime.now()
        )
    db.session.add(shift)
    db.session.commit()
    return jsonify(shift.serialize())


 