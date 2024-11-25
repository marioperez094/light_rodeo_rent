json.card do
  json.id                @card.id
  json.isCarousel        @card.isCarousel
  json.image_url         @card.image_url

  if @card.tag
    json.tag do
      json.tag_id        @card.tag.id
      json.english_name  @card.tag.english_name
      json.spanish_name  @card.tag.spanish_name
    end
  end
end