class StaticPagesController < ApplicationController
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
