import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Project {
  id: string;
  slug: string;
  title: string;
  city: string;
  description: string;
  budget_range: string;
  veteran_focus: boolean;
  section8_eligible?: boolean;
  typical_rent_range?: string;
  accessibility_features?: string[];
  featured_image_url?: string;
  before_image_url?: string;
  after_image_url?: string;
  progress_percentage?: number;
  status?: 'planning' | 'active' | 'completed' | 'cancelled';
  impact_badges?: string[];
  tags?: string[];
  latitude?: number;
  longitude?: number;
  updated_at?: any;
}

interface UseProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProjects(filterSection8 = false): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // Base query to get all active projects
      let q = query(
        collection(db, 'projects'),
        where('status', '!=', 'cancelled'),
        orderBy('status'),
        orderBy('updated_at', 'desc')
      );

      // Apply Section 8 filter if requested
      if (filterSection8) {
        // Create a new query with Section 8 filter
        // Note: Firestore allows only one inequality filter per query
        // So we need to get all projects and filter client-side for now
        const allProjectsQuery = query(
          collection(db, 'projects'),
          orderBy('updated_at', 'desc')
        );
        q = allProjectsQuery;
      }

      const querySnapshot = await getDocs(q);
      let projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Project));

      // Apply client-side filtering for Section 8 if needed
      if (filterSection8) {
        projectsData = projectsData.filter(project =>
          project.section8_eligible &&
          project.status !== 'cancelled' &&
          project.status !== undefined
        );
      } else {
        // For non-filtered queries, exclude cancelled projects
        projectsData = projectsData.filter(project =>
          project.status !== 'cancelled'
        );
      }

      setProjects(projectsData);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filterSection8]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  };
}
