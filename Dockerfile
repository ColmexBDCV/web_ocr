FROM tiangolo/uwsgi-nginx-flask:python3.8


RUN apt-get update && apt-get install -y curl automake apt-utils build-essential tesseract-ocr libleptonica-dev pngquant tesseract-ocr-spa tesseract-ocr-eng tesseract-ocr-fra ghostscript libtool 
COPY ./app /app
RUN \
  mkdir jbig2 \
  && curl -kL https://github.com/agl/jbig2enc/archive/refs/tags/0.29.tar.gz | \
  tar xz -C jbig2 --strip-components=1 \
  && cd jbig2 \
  && ./autogen.sh && ./configure && make && make install \
  && cd .. \
  && rm -rf jbig2


RUN pip install -r /app/requirements.txt

