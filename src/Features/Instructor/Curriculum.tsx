import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

type CurriculumItemType = 'Lecture' | 'Quiz' | 'Coding Exercise' | 'Practice Test' | 'Assignment';

interface CurriculumItem {
  type: CurriculumItemType;
  title: string;
  material: File | null;
  editing: boolean; 
}

interface Section {
  title: string;
  curriculum: CurriculumItem[];
}

interface Course {
  title: string;
  sections: Section[];
}

const CreateCurriculum: React.FC = () => {
  const [course, setCourse] = useState<Course>({
    title: '',
    sections: []
  });

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
      sections: [...course.sections, { title: '', curriculum: [] }]
    });
  };

  const handleSectionTitleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const sections = [...course.sections];
    sections[index].title = e.target.value;
    setCourse({ ...course, sections });
  };

  const handleAddCurriculumItem = (sectionIndex: number, type: CurriculumItemType) => {
    const sections = [...course.sections];
    sections[sectionIndex].curriculum.push({ type, title: '', material: null, editing: true });
    setCourse({ ...course, sections });
  };

  const handleCurriculumItemTitleChange = (sectionIndex: number, itemIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const sections = [...course.sections];
    sections[sectionIndex].curriculum[itemIndex].title = e.target.value;
    setCourse({ ...course, sections });
  };

  const handleDrop = (sectionIndex: number, itemIndex: number, acceptedFiles: File[]) => {
    const sections = [...course.sections];
    sections[sectionIndex].curriculum[itemIndex].material = acceptedFiles[0];
    setCourse({ ...course, sections });
  };

  const handleRemoveCurriculumItem = (sectionIndex: number, itemIndex: number) => {
    const sections = [...course.sections];
    sections[sectionIndex].curriculum.splice(itemIndex, 1);
    setCourse({ ...course, sections });
  };

  const handleSaveCurriculumItem = (sectionIndex: number, itemIndex: number) => {
    const sections = [...course.sections];
    sections[sectionIndex].curriculum[itemIndex].editing = false;
    setCourse({ ...course, sections });
  };

  const handleCancelCurriculumItem = (sectionIndex: number, itemIndex: number) => {
    const sections = [...course.sections];
    if (sections[sectionIndex].curriculum[itemIndex].title.trim() === '') {
      sections[sectionIndex].curriculum.splice(itemIndex, 1);
    } else {
      sections[sectionIndex].curriculum[itemIndex].editing = false;
    }
    setCourse({ ...course, sections });
  };

  return (
    <div className="container-fluid pt-5 pb-5">
      <div className="row">
        <div className="col-12">
          <h1>Create Course</h1>
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
                />
              </div>
              <div className="mt-2">
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={() => handleAddCurriculumItem(sectionIndex, 'Lecture')}
                >
                  <span className="cross-sign">+</span> Lecture
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary ml-2" 
                  onClick={() => handleAddCurriculumItem(sectionIndex, 'Quiz')}
                >
                  <span className="cross-sign">+</span> Quiz
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary ml-2" 
                  onClick={() => handleAddCurriculumItem(sectionIndex, 'Coding Exercise')}
                >
                  <span className="cross-sign">+</span> Coding Exercise
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary ml-2" 
                  onClick={() => handleAddCurriculumItem(sectionIndex, 'Practice Test')}
                >
                  <span className="cross-sign">+</span> Practice Test
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary ml-2" 
                  onClick={() => handleAddCurriculumItem(sectionIndex, 'Assignment')}
                >
                  <span className="cross-sign">+</span> Assignment
                </button>
              </div>
              {section.curriculum.map((item, itemIndex) => (
                <div key={itemIndex} className="mt-3">
                  <div className="form-group">
                    <label>{item.type} Title:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={item.title} 
                      onChange={(e) => handleCurriculumItemTitleChange(sectionIndex, itemIndex, e)} 
                      disabled={!item.editing}
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
                        className="btn btn-success mr-2" 
                        onClick={() => handleSaveCurriculumItem(sectionIndex, itemIndex)}
                      >
                        Save
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary mr-2" 
                        onClick={() => handleCancelCurriculumItem(sectionIndex, itemIndex)}
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
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
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
