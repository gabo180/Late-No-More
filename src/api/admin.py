  
import os
from flask_admin import Admin
from .models import db, Profile, Employee, Employer, Shift, Messages_author, Messages_recipient
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='Late No More Admin', template_mode='bootstrap3')

    admin.add_view(ModelView(Profile, db.session))
    admin.add_view(ModelView(Employee, db.session))
    admin.add_view(ModelView(Employer, db.session))
    admin.add_view(ModelView(Shift, db.session))
    admin.add_view(ModelView(Messages_author, db.session))
    admin.add_view(ModelView(Messages_recipient, db.session))