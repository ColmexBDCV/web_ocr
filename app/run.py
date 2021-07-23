# Importamos todo lo necesario
import os
from flask import Flask, render_template, request, send_file, redirect, after_this_request, send_from_directory
from werkzeug import secure_filename
import ocrmypdf
import time

# instancia del objeto Flask
app = Flask(__name__)
# Carpeta de subida
app.config['UPLOAD_FOLDER'] = './files'

@app.route("/")
def upload_file():
 # renderiamos la plantilla "formulario.html"
 return render_template('formulario.html')

@app.route("/upload", methods=['POST'])
def uploader():
  if not os.path.exists('./files'):
    os.makedirs('./files')
  if request.method == 'POST':
    # obtenemos el archivo del input "archivo"
    lang = request.values.get("lang")
    compress = request.values.get("compress")  
    f = request.files['archivo']
    filename = secure_filename(f.filename)
    # Guardamos el archivo en el directorio "Archivos PDF"
    f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    # Retornamos una respuesta satisfactoria
    filename_txt = "./files/ocr_"+filename.replace(".pdf",".txt")
    ocrmypdf.ocr('./files/'+filename, './files/'+'ocr_'+filename, deskew=True, force_ocr=True, language=lang, optimize=compress, jbig2_lossy=True, output_type="pdf", sidecar=filename_txt)
    os.remove('./files/'+filename)
    return redirect("/?file=ocr_"+filename.replace(".pdf",""))
    # return redirect("download/ocr_"+filename)

@app.route("/check/<string:filename>")
def check_file(filename):
  app.logger.debug('checar archivo')
  file = os.path.isfile("./files/"+filename) 
  if file:
    return "existe", 200
  else:
    return "error", 404


@app.route("/download/<string:filename>")
def downloader(filename):
  file_path = "./files/"+filename
  file_handle = open(file_path, 'r')
  @after_this_request
  def remove_file(response):
    try:
      os.remove(file_path)
      file_handle.close()
    except Exception as error:
        app.logger.error("Error removing or closing downloaded file handle", error)
    return response
  return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
 # Iniciamos la aplicación
 app.run(debug=True, host='0.0.0.0')

