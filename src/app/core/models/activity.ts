import { PrimeIcons } from "primeng/api";

enum Action {
    Search = 'search',
    EditProfile = 'edit_profile',
    Bookmark = 'bookmark',
};

export default interface ActivityLog {
    content: string;
    happenedAt: string;
    icon: PrimeIcons;
    action: Action; 
}