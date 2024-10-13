module Api
  class TaggablesController < ApplicationController
    
    def create
      if !current_session
        return render json: { error: 'No esta registrado.' }, 
        status: :unauthorized
      end

      service = Service.find_by(id: params[:taggable][:service_id])
      return render json: { error: 'No se encontro el servicio.' }, status: :not_found if !service

      tag = Tag.find_by(id: params[:taggable][:tag_id])
      return render json: { error: 'No se encontro el tag.' }, status: :not_found if !tag

      @taggable = Taggable.new(taggable_params)
      @taggable.service = service
      @taggable.tag = tag
      
      if @taggable.save
        render 'api/taggables/create', status: :created
      else ArgumentError => e
        render json: { error: @taggable.errors }, status: :bad_request
      end
    end

    def index
      @taggables = Taggable.order(created_at: :asc)
      render "api/taggables/index",
      status: :ok
    end

    def find_by_service_tag
      @taggable = Taggable.find_by(service_id: params[:service_id], tag_id: params[:tag_id])
      render "api/taggables/create",
      status: :ok
    end

    def destroy
      if !current_session
        return render json: { error: 'No esta registrado.' },
        status: :unauthorized
      end

      @taggable = Taggable.find_by(service_id: params[:service_id], tag_id: params[:tag_id])

      if @taggable&.destroy
        render json: { success: true }
      else
        render json: { success: false }
      end
    end

    private

    def taggable_params
      params.require(:taggable).permit(:service_id, :tag_id)
    end
  end
end
