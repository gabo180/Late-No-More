"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Profile, Punch, Messages, Shift
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

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

##Messages

@api.route('/messages', methods=['GET'])
@jwt_required()
def handle_messages():
    messages = Messages.query.all()
    mapped_messages=[m.serialize() for m in messages]
    return jsonify(mapped_messages), 200

@api.route('/messages/<int:messages_id>', methods=['GET'])
@jwt_required()
def handle_single_message(messages_id):
    messages = Messages.query.get(messages_id)
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

##Login

@api.route("/login", methods=["POST"])
def login():
    body = request.get_json()
    if body is None:
        raise APIException("You need to specify the body", 400)

    user = Profile.query.filter_by(email = body["email"]).first()
    if user is None:
        raise APIException("This user does NOT exist!", 400)

    if user.password != body["password"]:
        raise APIException ("Credentials are wrong!", 400)

    access_token = create_access_token(identity=user.email)
    return jsonify(access_token=access_token)