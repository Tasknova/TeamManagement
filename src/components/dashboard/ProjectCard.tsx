import React, { useEffect, useState } from 'react';
import { Project, Task } from '../../types';
import { supabase } from '../../lib/supabase';
import TaskCard from './TaskCard';
import { useAuth } from '../../contexts/AuthContext';
import { Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

interface ProjectCardProps {
  project: Project;
  isAdmin?: boolean;
  tasks?: Task[];
  onDelete?: (id: string) => void;
  onEdit?: (project: Project) => void;
  onStatusChange?: (id: string, status: Task['status']) => void;
  onUpdate?: (id: string, updates: Partial<Task>) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isAdmin, tasks = [], onDelete, onEdit, onStatusChange, onUpdate }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-100">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
        {isAdmin && (
          <div className="flex gap-2">
            <button
              title="Edit Project"
              className="p-1 rounded hover:bg-gray-100"
              onClick={() => onEdit && onEdit(project)}
            >
              <Edit2 className="w-4 h-4 text-gray-600" />
            </button>
            <button
              title="Delete Project"
              className="p-1 rounded hover:bg-gray-100"
              onClick={() => onDelete && onDelete(project.id)}
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        )}
      </div>
      <div className="text-gray-700 text-sm mb-1">Client: {project.client_name || 'N/A'}</div>
      <div className="text-gray-500 text-xs mb-2">Start: {project.start_date ? new Date(project.start_date).toLocaleDateString() : 'N/A'}</div>
      <div className="text-gray-500 text-xs mb-2">Expected End: {project.expected_end_date ? new Date(project.expected_end_date).toLocaleDateString() : 'N/A'}</div>
      {isAdmin && (
        <>
          <div className="text-gray-700 text-sm mb-2">Description: {project.description || 'N/A'}</div>
          <div className="text-gray-400 text-xs">Created: {new Date(project.created_at).toLocaleDateString()}</div>
          <div className="text-gray-400 text-xs">Updated: {new Date(project.updated_at).toLocaleDateString()}</div>
        </>
      )}
      <Button
        className="mt-2"
        variant="primary"
        onClick={() => navigate(`/projects/${project.id}/tasks`)}
      >
        Show Tasks
      </Button>
    </div>
  );
};

export default ProjectCard; 