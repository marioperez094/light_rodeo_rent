module Api
    class ServicesController < ApplicationController
      def create 
        if !current_session
          return render json: { error: 'No esta registrado' }, status: :unauthorized
        end
  
        user = current_session.user
  
        @service = Service.new(service_params)
        @service.user = user
  
        if @service.save
          render 'api/services/create', status: :created
  
        else
          render json: { error: @service.errors }, status: :bad_request
        end
      end
  
      def index
        @services = Service.order(created_at: :asc)
        render 'api/services/index', status: :ok
      end
  
      def show
        @service = search_service
        return render json: { error: 'Service not found.' }, status: :not_found if !@service 
  
        render 'api/services/create', status: :ok
      end
  
      def update
        if !current_session
          return render json: { error: 'No esta registrado.' }, status: :unauthorized
        end
  
        @service = search_service
        return render json: { error: 'Service not found.' }, status: :not_found if !@service 
  
        begin 
          @service.update(service_params)
          render 'api/services/create', status: :ok
        rescue ArgumentError => e
          render json: { error: e.message }, status: :bad_request
        end
      end
  
      def destroy
        if !current_session
          return render json: { error: 'No esta registrado.' }, status: :unauthorized
        end
  
        @service = search_service
  
        if @service&.destroy
          render json: { success: true }
        else
          render json: { success: false }
        end
      end
  
      private
  
      def search_service
        service = Service.find_by(id: params[:id])
        service
      end
  
      def service_params
        params.require(:service).permit(:english_name, :nombre_espanol, :english_description, :descripcion_espanol, :dimensions, :service_type)
      end
    end
  end