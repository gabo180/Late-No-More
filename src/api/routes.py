"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Profile, Messages_author, Messages_recipient, Shift, Employee, Employer
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
import datetime
import pytz
from api.emailSender import emailSender

api = Blueprint('api', __name__)



##Profile


@api.route('/profile', methods=['GET'])
@jwt_required()
def handle_all_profiles():
    profiles = Profile.query.all()
    mapped_profiles=[p.serialize() for p in profiles]
    return jsonify(mapped_profiles), 200

@api.route('/profile/singleProfile', methods=['GET'])
@jwt_required()
def handle_single_profile():
    profile_id = get_jwt_identity()
    profile = Profile.query.get(profile_id)
    return jsonify(profile.serialize()), 200

@api.route('/profile', methods=['POST'])
def create_profile():
    body = request.get_json()
    profile = Profile()

    if "name" in body:
        profile.name = body["name"]
    if "last_name" in body:
        profile.last_name = body["last_name"]
    if "username" in body:
        profile.username = body["username"]
    if "phone_number" in body:
        profile.phone_number = body["phone_number"]
    if "email" in body:
        profile.email = body["email"]
    if "password" in body:
        profile.password = body["password"]
    if "working_for" in body:
        profile.working_for = body["working_for"]
    

    db.session.add(profile)
    db.session.commit()
    return jsonify(profile.serialize())

@api.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    profile_id = get_jwt_identity()
    profile1 = Profile.query.get(profile_id)
    body = request.get_json()
    if profile1 is None:
        raise APIException('User not found', status_code=404)

    if "name" in body:
        profile1.name = body["name"]
    if "last_name" in body:
        profile1.last_name = body["last_name"]
    if "username" in body:
        profile1.username = body["username"]
    if "phone_number" in body:
        profile1.phone_number = body["phone_number"]
    if "email" in body:
        profile1.email = body["email"]
    if "employer" in body:
        profile1.employer = body["employer"]
    if "working_for" in body:
        profile.working_for = body["working_for"]
    
    db.session.commit()
    return jsonify(profile1.serialize())



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
@jwt_required()
def post_shift():
    body = request.get_json()

    shift = Shift()

    if "role_id" in body:
        shift.role_id = body["role_id"]
    if "profile_id" in body:
        shift.profile_id = body["profile_id"]
    if "starting_time" in body:
        shift.starting_time = body["starting_time"]
    if "ending_time" in body:
        shift.ending_time = body["ending_time"]
    if "employer_id" in body:
        shift.employer_id = body["employer_id"]
    
    db.session.add(shift)
    db.session.commit()
    get_all_shifts = Shift.query.all()
    mapped_shifts=[s.serialize() for s in get_all_shifts]
    return jsonify(mapped_shifts)

@api.route('/shift/<int:shift_id>', methods=['PUT'])
# @jwt_required()
def put_shift(shift_id):
    body = request.get_json()

    shift = Shift.query.filter_by(id = shift_id)

    if "role_id" in body:
        shift.role_id = body["role_id"]
    if "starting_time" in body:
        shift.starting_time = body["starting_time"]
    if "ending_time" in body:
        shift.ending_time = body["ending_time"]
    
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

    if shift is None:
        raise APIException('Shift not found', status_code=404)

    if shift.clock_in is not None:
        return 'Clock in already done', 400

    shift.clock_in = datetime.datetime.now(UTC)
    
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

    if shift.clock_out is not None:
        return 'Clock out already done', 400

    shift.clock_out = datetime.datetime.now(UTC)

    db.session.commit()
    return jsonify(shift.serialize())

@api.route('/shift/<int:shift_id>', methods=['DELETE'])
def delete_shift(shift_id):
    shift1 = Shift.query.get(shift_id)
    
    db.session.delete(shift1)
    db.session.commit()

    get_all_shifts = Shift.query.all()
    mapped_shifts=[s.serialize() for s in get_all_shifts]
    return jsonify(mapped_shifts)


##  EMPLOYER


@api.route('/employer', methods=['GET'])
def handle_employer():
    employer = Employer.query.all()
    mapped_employers=[s.serialize() for s in employer]
    return jsonify(mapped_employers), 200

@api.route('/employer/<int:employer_id>', methods=['GET'])
@jwt_required()
def handle_single_employer(employer_id):
    employers = Employer.query.get(employer_id)
    employers = employers.serialize()
    return jsonify(employers), 200

@api.route('/employer', methods=['POST'])
@jwt_required()
def create_employer():
    body = request.get_json()
    company_name = body["company_name"]

    employer = Employer()

    if company_name:
        employer.company_name = company_name
    

    db.session.add(employer)
    db.session.commit()
    return jsonify(employer.serialize())

@api.route('/employer/<int:employer_id>', methods=['PUT'])
@jwt_required()
def update_employer(employer_id):
    employer1 = Employer.query.get(employer_id)

    if employer1 is None:
        raise APIException('User not found', status_code=404)

    if "company_name" in body:
        employer1.company_name = body["company_name"]

    db.session.commit()
    return jsonify(employer1.serialize())

@api.route('/employer/<int:employer_id>', methods=['DELETE'])
def delete_employer(employer_id):
    employer1 = Employer.query.get(employer_id)
    
    db.session.delete(employer1)
    db.session.commit()

    return jsonify(employer1.serialize())


  
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

@api.route('/employee', methods=['POST'])
@jwt_required()
def create_employee():
    body = request.get_json()
    role = body["role"]
    hourly_rate = body["hourly_rate"]
    employer_id = body["employer_id"]

    employee = Employee()

    if role:
        employee.role = role
    if hourly_rate:
        employee.hourly_rate = hourly_rate
    if employer_id:
        employee.employer_id = employer_id

    db.session.add(employee)
    db.session.commit()
    return jsonify(employee.serialize())

@api.route('/employee/<int:employee_id>', methods=['PUT'])
def update_employee(employee_id):
    employee1 = Employee.query.get(employee_id)
    if employee1 is None:
        raise APIException('User not found', status_code=404)

    if "role" in body:
        employee1.username = body["role"]

    if "hourly_rate" in body:
        employee1.hourly_rate = body["hourly_rate"]

    db.session.commit()
    return jsonify(employee1.serialize())

@api.route('/employee/<int:employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    employee1 = Employee.query.get(employee_id)
    
    db.session.delete(employee1)
    db.session.commit()

    get_all_employees = Employee.query.all()
    mapped_employees=[e.serialize() for e in get_all_employees]
    return jsonify(mapped_employees)



##Login



@api.route("/login", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = Profile.query.filter_by(username=username, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401
    

    emailSender(user.email)
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })



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