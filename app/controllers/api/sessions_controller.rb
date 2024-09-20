module Api
    class SessionsController < ApplicationController
      def create
        #Username to find user
        @user = User.find_by(username: params[:user][:username])
  
        if !@user && !(BCrypt::Password.new(@user.password) == params[:user][:password])
          return render json: {
            error: 'Invalid username or password.'
          }, status: :not_found
        end
          
        session = @user.sessions.create
        #User logged out after browser closing for privacy
        cookies.signed[:light_rodeo_session_token] = {
          value: session.token,
          httponly: true
        }
  
        render 'api/sessions/create'
      end
  
      def authenticated
        if !current_session
          return render json: {
            authenticated: false
          }
        end
  
        @user = current_session.user
        render 'api/sessions/authenticated'
      end
  
      def destroy
        if current_session&.destroy
          render json: {
            success: true
          }, status: :ok
        end
      end
    end
  end