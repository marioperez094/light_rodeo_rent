module Api
    class TagsController < ApplicationController
        def create
            if !current_session
                return render json: { error: 'No esta registrado' }, 
                status: :unauthorized
            end

            @tag = Tag.new(tag_params)
            
            if @tag.save
                render 'api/tags/create',
                status: :created

            else
                render json: { error: @tag.errors },
                status: :bad_request
            end
        end

        def index
            @tags = Tag.order(created_at: :asc)
            render 'api/tags/index', 
            status: :ok
        end

        def show
            @tag = search_tag
            return render json: { error: 'No se encontro el Tag' },
            status: :not_found if !@tag

            render 'api/tags/create',
            status: :ok
        end

        def destroy
            if !current_session
                return render json: { error: 'No esta registrado.' }, status: :unauthorized
            end

            @tag = search_tag

            if @tag&.destroy
                render json: { success: true }
            else
                render json: { success: false }
            end
        end

        def index_by_service
            service = Service.find_by(id: params[:id])
            return render json: { error: 'No se encontro el servicio.' },
            status: :not_found if !service

            @tags = service.tags.order(created: :asc)
            render 'api/tags/index', status: :ok
        end

        def index_all_and_belongs
            @service = Service.find_by(id: params[:id])
            return render json: { error: 'No se encontro el servicio.'},
            status: :not_found if !@service

            @tags = Tag.order(created_at: :asc)
            render 'api/tags/indexByService', 
            status: :ok
        end

        private

        def search_tag
            tag = Tag.find_by(id: params[:id])
            tag
        end

        def tag_params
            params.require(:tag).permit(:english_name, :spanish_name, :inflatable)
        end
    end
end