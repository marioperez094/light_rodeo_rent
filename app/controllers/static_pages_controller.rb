class StaticPagesController < ApplicationController
  def admin
    render 'admin'
  end

  def login
    render 'login'
  end
end
