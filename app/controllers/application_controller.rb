class ApplicationController < ActionController::Base

    def current_session
      token = cookies.signed[:light_rodeo_session_token]
      session = Session.find_by(token: token)
      session
    end

    def admin_check
      unless current_session
        return redirect_to '/admin/login'
      end
    end
  end