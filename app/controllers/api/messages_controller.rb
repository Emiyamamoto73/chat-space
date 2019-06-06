class Api::MessagesController < ApplicationController
  def index
    @message = Message.new
    @group = Group.find(params[:group_id])
    respond_to do |format|
      format.json {@messages = @group.messages.where("id > ?", params[:id])}
    end 
  end
end