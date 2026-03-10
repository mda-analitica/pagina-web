import React, { useRef, useState } from 'react';
import { Icon } from './Icon';

export interface AttachmentFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

interface FileUploadProps {
  onFilesSelected: (files: AttachmentFile[]) => void;
  maxSize?: number; // en MB
  accept?: string;
  multiple?: boolean;
  label?: string;
  disabled?: boolean;
}

export function FileUpload({
  onFilesSelected,
  maxSize = 10,
  accept = '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.png',
  multiple = true,
  label = 'Cargar archivos',
  disabled = false,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<AttachmentFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFiles = (files: FileList) => {
    const newFiles: AttachmentFile[] = [];

    Array.from(files).forEach((file) => {
      const sizeInMB = file.size / (1024 * 1024);

      if (sizeInMB > maxSize) {
        alert(`El archivo "${file.name}" excede el tamaño máximo de ${maxSize}MB`);
        return;
      }

      const attachmentFile: AttachmentFile = {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      };

      newFiles.push(attachmentFile);
    });

    if (newFiles.length > 0) {
      const updated = multiple ? [...uploadedFiles, ...newFiles] : newFiles;
      setUploadedFiles(updated);
      onFilesSelected(updated);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0] && !disabled) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDeleteFile = (fileId: string) => {
    const updated = uploadedFiles.filter(f => f.id !== fileId);
    setUploadedFiles(updated);
    onFilesSelected(updated);
  };

  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 dark:text-white">
          {label}
        </label>
      )}

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-primary dark:border-secondary bg-primary/5 dark:bg-secondary/5'
            : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary hover:dark:border-secondary'}`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          disabled={disabled}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => !disabled && inputRef.current?.click()}
          disabled={disabled}
          className="w-full"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <Icon name="cloud_upload" size={32} className="text-gray-400 dark:text-gray-500" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Arrastra archivos aquí o haz clic para seleccionar
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Máximo {maxSize}MB por archivo
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            {uploadedFiles.length} archivo{uploadedFiles.length !== 1 ? 's' : ''} cargado{uploadedFiles.length !== 1 ? 's' : ''}
          </p>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Icon
                    name={
                      file.type.includes('pdf')
                        ? 'picture_as_pdf'
                        : file.type.includes('image')
                        ? 'image'
                        : 'insert_drive_file'
                    }
                    size={20}
                    className="text-gray-500 dark:text-gray-400 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteFile(file.id)}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors flex-shrink-0 ml-2"
                >
                  <Icon name="close" size={16} className="text-red-600 dark:text-red-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
