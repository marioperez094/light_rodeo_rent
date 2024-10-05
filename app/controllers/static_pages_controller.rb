class StaticPagesController < ApplicationController
  def admin
    admin_check
  end

  def admin_services
    admin_check
  end

  def admin_categories
    admin_check
  end
    
  def login
    render 'login'
  end
end
