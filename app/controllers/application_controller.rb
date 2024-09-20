class ApplicationController < ActionController::Base

    def current_session
      token = cookies.signed[:light_rodeo_session_token]
      session = Session.find_by(token: token)
      session
    end
  end