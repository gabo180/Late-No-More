"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Profile, Messages_author, Messages_recipient, Shift, Employee
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import datetime
import pytz
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

@api.route('/shift', methods=['POST'])
# @jwt_required()
def post_shift():
    body = request.get_json()

    shift = Shift()

    if "role_id" in body:
        shift.role_id = body["role_id"]
    if "starting_time" in body:
        shift.starting_time = body["starting_time"]
    if "ending_time" in body:
        shift.ending_time = body["ending_time"]
    if "hours" in body:
        shift.ending_time = body["ending_time"] - body["starting_time"]
    
    db.session.add(shift)
    db.session.commit()
    return jsonify(shift.serialize())

@api.route('/shift/<int:shift_id>/CI', methods=['PUT'])
@jwt_required()
def update_single_shift_clock_in(shift_id):
    body = request.get_json()
    shift = Shift.query.get(shift_id)
    current_user_id = get_jwt_identity()
    current_user_id_role = Profile.query.get(current_user_id)
    IST = pytz.timezone('America/New_York')
    UTC = pytz.utc
    # print(current_user_id_role.id)
    # print(current_user_id)
    # print(shift.role_id)

    if shift is None:
        raise APIException('Shift not found', status_code=404)

    if shift.role_id is not current_user_id_role.employee.id:
        return "Your role assigned doesn't match the on ein this shift", 401

    if shift.clock_in is not None:
        return 'Clock in already done', 400

    shift.clock_in = datetime.datetime.utcnow()
    
    db.session.commit()
    return jsonify(shift.serialize())

@api.route('/shift/<int:shift_id>/CO', methods=['PUT'])
@jwt_required()
def update_single_shift_clock_out(shift_id):
    body = request.get_json()
    shift = Shift.query.get(shift_id)
    current_user_id = get_jwt_identity()
    current_user_id_role = Profile.query.get(current_user_id)
    IST = pytz.timezone('America/New_York')
    UTC = pytz.utc

    print(datetime.datetime.now(IST))

    if shift is None:
        raise APIException('Shift not found', status_code=404)
    
    if shift.role_id is not current_user_id_role.employee.id:
        return "Your role assigned doesn't match the on ein this shift", 401

    if shift.clock_out is not None:
        return 'Clock out already done', 400


    # if "clock_out" in body:
    shift.clock_out = datetime.datetime.now(UTC)

    db.session.commit()
    return jsonify(shift.serialize())



##Punch

# @api.route('/punch', methods=['GET'])
# @jwt_required()
# def handle_punch():
#     punches = Punch.query.all()
#     mapped_punches=[s.serialize() for s in punches]
#     return jsonify(mapped_punches), 200

# @api.route('/punch/<int:punch_id>', methods=['GET'])
# @jwt_required()
# def handle_single_punch(punch_id):
#     punches = Punch.query.get(punch_id)
#     punches = punches.serialize()
#     return jsonify(punches), 200

# @api.route('/shift/<int:shift_id>', methods=['PUT'])
# @jwt_required()
# def update_shift(shift_id):
#     request_data = request.data
#     body = json.loads(request_data)
#     shift1 = Shift.query.get(shift_id)
#     if shift1 is None:
#         raise APIException('Shift not found', status_code=404)
#     if "username" in body:
#         user1.username = body["username"]
#     if "email" in body:
#         user1.email = body["email"]
#     db.session.commit()

# @api.route('/punch/<int:shift_id>', methods=['POST'])
# @jwt_required()
# def post_punch(shift_id):
#     body = request.get_json()
#     punch1 = Punch(
#         time_stamp=datetime.datetime.now(),
#         shift_id = shift_id
#         )
#     db.session.add(punch1)
#     db.session.commit()
#     return jsonify(punch1.serialize())

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

# @api.route('/shift', methods=['POST'])
# def post_shift():
#     body = request.get_json()
#     shift = Shift(
#         hours=body["hours"], 
#         role=body["role"],
#         starting_time=datetime.datetime.now(),
#         ending_time=datetime.datetime.now()
#         )
#     db.session.add(shift)
#     db.session.commit()
#     return jsonify(shift.serialize())


 