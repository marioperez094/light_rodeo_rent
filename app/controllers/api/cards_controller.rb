module Api
  class CardsController < ApplicationController
    def create
      if !current_session
        return render json: { error: 'No esta registrado' }, 
        status: :unauthorized
      end

      tag = Tag.find_by(id: params[:card][:tag_id])
      return render json: { error: 'No se encontro el tag.' }, 
      status: :not_found if !tag && !params[:card][:isCarousel]

      @card = Card.new(card_params)
      @card.tag = tag
      
      if @card.save
        render 'api/cards/create',
        status: :created
      else
        render json: { error: @card.errors },
        status: :bad_request
      end
    end

    def index
      @cards = Card.order(created_at: :asc)
      render 'api/cards/index',
      status: :ok
    end

    def show
      @card = search_card
      return render json: { error: 'No se encontro la carta' },
      status: :not_found if !@card

      render 'api/cards/create',
      status: :ok
    end

    def update
      if !current_session
        return render json: { error: 'No esta registrado.' }, 
        status: :unauthorized
      end

      @card = search_card
      return render json: { error: 'No se encontro la carta' },
      status: :not_found if !@card

      begin
        @card.update(card_params)
        render 'api/cards/create',
        status: :ok
      rescue ArgumentError => e
        render json: { error: e.message },
        status: :bad_request
      end
    end

    private
    
    def search_card
      card = Card.find_by(id: params[:id])
      card
    end

    def card_params
      params.require(:card).permit(:tag_id, :isCarousel, :image_url)
    end
  end
end
