import React from 'react';
import { BookmarkCheck, Trash2, Calendar, ArrowRight, X } from 'lucide-react';
import { SavedEventItem } from '../types/event';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: SavedEventItem[];
  onSelect: (item: SavedEventItem) => void;
  onDelete: (id: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  savedItems,
  onSelect,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="h-5 w-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Saved Event Campaigns</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 max-h-[420px] overflow-y-auto space-y-2.5 pr-1">
          {savedItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No saved campaigns yet. Generated campaigns will automatically appear here for easy access.
            </div>
          ) : (
            savedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 p-3 hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                <div
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="flex-1 cursor-pointer pr-3"
                >
                  <div className="font-bold text-sm text-slate-900 hover:text-indigo-600 truncate">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <Calendar className="h-3 w-3 text-slate-400" />
                    <span>{item.date || 'Date TBA'}</span>
                    <span>·</span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className="flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
                  >
                    <span>Load</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Delete saved campaign"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
