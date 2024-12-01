class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def service_filter
    @data = { tag_id: params[:id] }.to_json
    render 'service_filter'
  end

  def service
    @data = { service_id: params[:id] }.to_json
    render 'service'
  end

  def admin
    admin_check
  end

  def admin_service_list
    admin_check
  end

  def admin_service
    admin_check
    @data = { service_id: params[:id] }.to_json
  end

  def admin_tags
    admin_check
  end

  def admin_homepage
    admin_check
  end
    
  def login
    render 'login'
  end
end
