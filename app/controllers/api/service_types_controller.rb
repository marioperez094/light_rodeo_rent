module Api
  class ServiceTypesController < ApplicationController
    def create
      if !current_session
        return render json: { error: 'No esta registrado' },
        status: :unauthorized
      end

      @service_type = ServiceType.new(service_type_params)

      if @service_type.save
        render 'api/service_types/create',
        status: :created
      else
        render json: { error: @service_type.errors },
        status: :bad_request
      end
    end

    def index
      @service_types = ServiceTypes.order(created_at: :asc)
      render 'api/service_types/index',
      status: :ok
    end

    def show
      @service_type = search_service_type
      return render json: { error: 'No se encontro el tipo de servicio' },
      status: :not_found if !@service_type

      render 'api/service_types/create',
      status: :ok
    end

    def update
      if !current_session
        return render json: { error: ''}
    end
end
