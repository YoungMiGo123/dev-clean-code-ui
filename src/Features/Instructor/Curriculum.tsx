import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

type CurriculumItemType = 'Lecture' | 'Quiz' | 'Coding Exercise' | 'Practice Test' | 'Assignment';

interface CurriculumItem {
  curriculumItemId: string;
  sectionId: string;
  title: string;
  type: string;
  material: string | null;
  editing: boolean;
}

interface Section {
  sectionId: string;
  courseId: string;
  title: string;
  curriculumItems: CurriculumItem[];
}

interface Course {
  courseId: string;
  userId: string;
  title: string;
  sections: Section[];
}

const CreateCurriculum: React.FC = () => {
  const [course, setCourse] = useState<Course>({
    courseId: '3fa85f64-5717-4562-b3fc-2c963f66afa6', 
    userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',  
    title: '',
    sections: []
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isCourseCleared, setIsCourseCleared] = useState(false);

  const handleCourseTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourse({ ...course, title: e.target.value });
  };

  const handleAddSection = () => {
    if (course.title.trim() === '') {
      alert('Please enter a course title before adding a section.');
      return;
    }
    setCourse({
      ...course,
      sections: [
        ...course.sections,
        {
          sectionId: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Replace with a unique identifier
          courseId: course.courseId,
          title: '',
          curriculumItems: []
        }
      ]
    });
  };

  const handleSectionTitleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const sections = [...course.sections];
    sections[index].title = e.target.value;
    setCourse({ ...course, sections });
  };

  const handleAddCurriculumItem = (sectionIndex: number, type: CurriculumItemType) => {
    const sections = [...course.sections];
    sections[sectionIndex].curriculumItems.push({
      curriculumItemId: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Replace with a unique identifier
      sectionId: sections[sectionIndex].sectionId,
      title: '',
      type: type,
      material: null,
      editing: true
    });
    setCourse({ ...course, sections });
  };

  const handleCurriculumItemTitleChange = (sectionIndex: number, itemIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const sections = [...course.sections];
    sections[sectionIndex].curriculumItems[itemIndex].title = e.target.value;
    setCourse({ ...course, sections });
  };

  const handleDrop = (sectionIndex: number, itemIndex: number, acceptedFiles: File[]) => {

    const sections = [...course.sections];
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
        const base64String = reader.result as string;

        // Accept multiple file types
        const allowedFileTypes = [
            'application/pdf',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'video/mp4'
        ];

        // Check if the uploaded file is of an allowed type
        if (allowedFileTypes.includes(file.type)) {
            sections[sectionIndex].curriculumItems[itemIndex].material = base64String;
            setCourse({ ...course, sections });
        } else {
            alert('Unsupported file type. Please upload a PDF, PowerPoint, Word document, or MP4 video.');
        }
    };

    reader.readAsDataURL(file);  // Convert the file to base64 string
   
  };

  const handleRemoveCurriculumItem = (sectionIndex: number, itemIndex: number) => {
    const sections = [...course.sections];
    sections[sectionIndex].curriculumItems.splice(itemIndex, 1);
    setCourse({ ...course, sections });
  };

  const handleCancelCurriculumItem = (sectionIndex: number, itemIndex: number) => {
    const sections = [...course.sections];
    if (sections[sectionIndex].curriculumItems[itemIndex].title.trim() === '') {
      sections[sectionIndex].curriculumItems.splice(itemIndex, 1);
    } else {
      sections[sectionIndex].curriculumItems[itemIndex].editing = false;
    }
    setCourse({ ...course, sections });
  };

  const handleCancelSection = (sectionIndex: number) => {
    const sections = [...course.sections];
    sections.splice(sectionIndex, 1);
    setCourse({ ...course, sections });
  };

  const handleSaveCourse = async () => {
    console.log(course);
    try {
      const response = await fetch('https://localhost:7149/api/Instructor/CreateCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
      });
      console.log('response' ,response);
      
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error message from server:', errorMessage);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Course saved:', data);
      setSuccessMessage('Course saved successfully!');
      setIsCourseCleared(false);

    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  return (
    <div className="container-fluid pt-5 pb-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h1>Create Course</h1>
            <button type="button" className="btn btn-success" onClick={handleSaveCourse}>
              Save
            </button>
          </div>
          {successMessage && (

          <div className="alert alert-success" role="alert">
            {successMessage}

          </div>
          )}

          <div className="form-group">
            <label>Course Title:</label>
            <input 
              type="text" 
              className="form-control" 
              value={course.title} 
              onChange={handleCourseTitleChange} 
            />
          </div>
          {course.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mt-4 p-3 section-border rounded">
              <div className="form-group">
                <label>Section Title:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={section.title} 
                  onChange={(e) => handleSectionTitleChange(sectionIndex, e)} 
                  disabled={isCourseCleared}
                />
              </div>
              <div className="mt-2">
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={() => handleAddCurriculumItem(sectionIndex, 'Lecture')}
                  disabled={isCourseCleared}
                >
                  <span className="cross-sign">+</span> Lecture
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary ml-2" 
                  onClick={() => handleAddCurriculumItem(sectionIndex, 'Quiz')}
                  disabled={isCourseCleared}
                >
                  <span className="cross-sign">+</span> Quiz
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary ml-2" 
                  onClick={() => handleAddCurriculumItem(sectionIndex, 'Coding Exercise')}
                  disabled={isCourseCleared}
                >
                  <span className="cross-sign">+</span> Coding Exercise
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary ml-2" 
                  onClick={() => handleAddCurriculumItem(sectionIndex, 'Practice Test')}
                  disabled={isCourseCleared}
                >
                  <span className="cross-sign">+</span> Practice Test
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary ml-2" 
                  onClick={() => handleAddCurriculumItem(sectionIndex, 'Assignment')}
                  disabled={isCourseCleared}
                >
                  <span className="cross-sign">+</span> Assignment
                </button>
              </div>
              {section.curriculumItems.map((item, itemIndex) => (
                <div key={itemIndex} className="mt-3">
                  <div className="form-group">
                    <label>{item.type} Title:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={item.title} 
                      onChange={(e) => handleCurriculumItemTitleChange(sectionIndex, itemIndex, e)} 
                      disabled={!item.editing || isCourseCleared}
                    />
                  </div>
                  {item.type === 'Lecture' && item.editing && (
                    <FileUploader 
                      onDrop={(acceptedFiles) => handleDrop(sectionIndex, itemIndex, acceptedFiles)} 
                    />
                  )}
                  {item.editing ? (
                    <div className="mt-2">
                      <button 
                        type="button" 
                        className="btn btn-secondary mr-2" 
                        onClick={() => handleCancelCurriculumItem(sectionIndex, itemIndex)}
                        disabled={isCourseCleared}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <button 
                        type="button" 
                        className="btn btn-danger mr-2" 
                        onClick={() => handleRemoveCurriculumItem(sectionIndex, itemIndex)}
                        disabled={isCourseCleared}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <button 
                type="button" 
                className="btn btn-secondary mt-3" 
                onClick={() => handleCancelSection(sectionIndex)}
                disabled={isCourseCleared}
              >
                 Remove Section
              </button>
            </div>
          ))}
          <button 
            type="button" 
            className="btn btn-secondary mt-3" 
            onClick={handleAddSection}
          >
            <span className="cross-sign">+</span> Section
          </button>
        </div>
      </div>
    </div>
  );
};

const FileUploader: React.FC<{ onDrop: (acceptedFiles: File[]) => void }> = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div 
      {...getRootProps()} 
      style={{ border: '1px solid #ccc', padding: '20px', marginTop: '10px' }}
    >
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default CreateCurriculum;
