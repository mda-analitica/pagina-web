import type { ComponentPropsWithoutRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUp, BarChart3, Bot, BookOpen, Building2,
  CalendarDays, CalendarRange, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight,
  ChevronUp, Circle, CircleAlert, CircleX, Clipboard, ClipboardCheck, ClipboardPaste,
  Clock, Cloud, CloudUpload, CreditCard, Download, ExternalLink, Eye, File, FileImage,
  FileSpreadsheet, FileText, FileWarning, Filter, Folder, FolderArchive, FolderOpen,
  Gavel, Globe, GraduationCap, Grid3X3, Handshake, HelpCircle, History, Home, Hourglass,
  IdCard, Image, Inbox, Info, Landmark, Layers, LayoutGrid, LayoutList, Library, LineChart,
  ListFilter, Lock, Maximize2, Mic, Minimize2, Network, Package, Paperclip, Pencil, Plane,
  Plus, PlusCircle, Presentation, RefreshCw, Router, Save, Scale, Search, SearchX, Shield,
  ShieldCheck, SlidersHorizontal, TableProperties, Tag, Trash, Trash2, TrendingUp, Undo2,
  User, UserPlus, Users, Users2, X,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  home: Home, view_list: LayoutList, grid_on: Grid3X3,
  date_range: CalendarRange, event: CalendarDays, schedule: Clock, history: History,
  fact_check: ClipboardCheck, find_in_page: Search, assignment_turned_in: ClipboardCheck,
  assignment: Clipboard, description: FileText, menu_book: BookOpen, library_books: Library,
  article: FileText, insert_drive_file: File, picture_as_pdf: FileImage,
  table_chart: FileSpreadsheet, table_rows: TableProperties, slideshow: Presentation,
  folder: Folder, folder_open: FolderOpen, folder_zip: FolderArchive,
  analytics: BarChart3, assessment: BarChart3, insights: LineChart,
  pending_actions: Hourglass, warning: CircleAlert, error: CircleAlert, info: Info,
  check: Check, check_circle: CheckCircle2, cancel: CircleX, verified: ShieldCheck,
  verified_user: ShieldCheck, radio_button_unchecked: Circle, radio_button_checked: CheckCircle2,
  add: Plus, add_circle: PlusCircle, close: X, clear: X, delete: Trash2,
  delete_outline: Trash, restore_from_trash: Undo2, edit: Pencil, visibility: Eye,
  save: Save, undo: Undo2, download: Download, open_in_new: ExternalLink,
  content_paste: ClipboardPaste, sync: RefreshCw,
  arrow_forward: ArrowRight, arrow_back: ArrowLeft, arrow_upward: ArrowUp,
  arrow_downward: ArrowDown, chevron_left: ChevronLeft, chevron_right: ChevronRight,
  expand_less: ChevronUp, expand_more: ChevronDown,
  filter_list: Filter, filter_alt: ListFilter, search: Search, search_off: SearchX,
  people: Users, groups: Users2, person_add: UserPlus, business: Building2,
  account_balance: Landmark,
  cloud: Cloud, cloud_upload: CloudUpload, attach_file: Paperclip,
  tune: SlidersHorizontal, quiz: HelpCircle, help_outline: HelpCircle,
  segment: LayoutGrid, router: Router, public: Globe, inventory_2: Package,
  report: FileWarning, rule: Scale, gavel: Gavel, summarize: FileText, update: RefreshCw,
  lock: Lock, inbox: Inbox, image: Image, list: LayoutList,
  policy: ShieldCheck, flight: Plane, credit_card: CreditCard, handshake: Handshake,
  record_voice_over: Mic,
  label: Tag, category: Layers, person: User, account_tree: Network,
  fullscreen: Maximize2, fullscreen_exit: Minimize2,
  grading: ClipboardCheck, badge: IdCard, shield: Shield, smart_toy: Bot,
  trending_up: TrendingUp, school: GraduationCap,
};

export interface IconProps extends Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'height'> {
  name: string;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, size, strokeWidth = 2, className, ...props }: IconProps) {
  const LucideComponent = iconMap[name] ?? Info;
  return (
    <LucideComponent
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden={props['aria-label'] ? undefined : true}
      {...props}
    />
  );
}
