"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Profile
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

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