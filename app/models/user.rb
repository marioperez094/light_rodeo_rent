class User < ApplicationRecord
    has_many :sessions
    has_many :services
  
    validates :username, presence: true
    validates :password, presence: true
  
    after_validation :hash_password
  
    private
  
    def hash_password
      self.password = BCrypt::Password.create(self.password)
    end
  end