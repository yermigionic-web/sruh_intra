import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useApp } from '@/context'
import { AppShell } from '@/components/AppShell'
import { ThemeEngine } from '@/components/ThemeAudio'
import { RegisterPage } from '@/pages/RegisterPage'
import { HomePage } from '@/pages/HomePage'
import { MessagesHub, MessageThreadPage } from '@/pages/MessagesHub'
import { ScheduleHub } from '@/pages/ScheduleHub'
import { PeoplePage } from '@/pages/PeoplePage'
import { MorePage } from '@/pages/MorePage'
import { OrPage } from '@/pages/OrPage'
import { ConsultPage } from '@/pages/ConsultPage'
import { HandoffPage, WardPage } from '@/pages/HandoffPage'
import { ImagingPage } from '@/pages/ImagingPage'
import { BoardPage, LostPage, NoticesPage } from '@/pages/BoardPage'
import { CafeteriaPage } from '@/pages/CafeteriaPage'
import {
  AcademicPage,
  ApprovalsPage,
  ArchivePage,
  PapersPage,
  RecentPage,
  ResearchPage,
  RoomsPage,
  SettingsPage,
} from '@/pages/MiscPages'

function Gate({ children }: { children: ReactNode }) {
  const { profile } = useApp()
  if (!profile) return <Navigate to="/register" replace />
  return children
}

export function App() {
  const { profile } = useApp()
  return (
    <>
      <ThemeEngine enabled={!!profile} />
      <Routes>
      <Route path="/register" element={profile ? <Navigate to="/" replace /> : <RegisterPage />} />
      <Route
        element={
          <Gate>
            <AppShell />
          </Gate>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule" element={<ScheduleHub />} />
        <Route path="/messages" element={<MessagesHub />} />
        <Route path="/messages/:staffId" element={<MessageThreadPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/more" element={<MorePage />} />
        <Route path="/more/or" element={<OrPage />} />
        <Route path="/more/ward" element={<WardPage />} />
        <Route path="/more/consult" element={<ConsultPage />} />
        <Route path="/more/handoff" element={<HandoffPage />} />
        <Route path="/more/imaging" element={<ImagingPage />} />
        <Route path="/more/board" element={<BoardPage />} />
        <Route path="/more/notices" element={<NoticesPage />} />
        <Route path="/more/lost" element={<LostPage />} />
        <Route path="/more/cafeteria" element={<CafeteriaPage />} />
        <Route path="/more/academic" element={<AcademicPage />} />
        <Route path="/more/research" element={<ResearchPage />} />
        <Route path="/more/papers" element={<PapersPage />} />
        <Route path="/more/approvals" element={<ApprovalsPage />} />
        <Route path="/more/rooms" element={<RoomsPage />} />
        <Route path="/more/recent" element={<RecentPage />} />
        <Route path="/more/settings" element={<SettingsPage />} />
        <Route path="/more/archive" element={<ArchivePage />} />
        <Route path="/pager" element={<Navigate to="/messages?tab=pager" replace />} />
        <Route path="/directory" element={<Navigate to="/people" replace />} />
        <Route path="/duty" element={<Navigate to="/schedule?tab=duty" replace />} />
        <Route path="/board" element={<Navigate to="/more/board" replace />} />
        <Route path="/settings" element={<Navigate to="/more/settings" replace />} />
      </Route>
      <Route path="*" element={<Navigate to={profile ? '/' : '/register'} replace />} />
    </Routes>
    </>
  )
}
