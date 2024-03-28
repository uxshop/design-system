import { Toast as $toast } from './components/ui/toast';
import { Variant } from '../../../types';

export declare const $dialog: {
    open: (config?: OpenDialogConfig) => void;
    delete(config?: OpenDialogConfig): void;
    prompt(config?: {}): void;
    confirm(config?: OpenDialogConfig): void;
};

export { $toast }

export declare const Alert: any;

export declare const Apexchart: any;

export declare const Aside: any;

export declare const AsideSection: any;

export declare const Avatar: any;

export declare const Badge: any;

export declare const BrowserSelect: any;

export declare const Button: any;

export declare const ButtonAction: any;

export declare const ButtonActionList: any;

export declare const ButtonGroup: any;

export declare const CalloutCard: any;

export declare const Card: any;

export declare const CardActive: any;

export declare const CardAnnotation: any;

export declare const CardItem: any;

export declare const CardSection: any;

export declare const CardSeo: any;

export declare const CardTitle: any;

export declare const Codemirror: any;

export declare const Col: any;

export declare const ColorThumb: any;

export declare const Container: any;

export declare const CustomScroll: any;

declare const _default: any;
export { _default as FormAutocomplete }
export { _default as Select }

export declare const DescriptionList: any;

export declare const DescriptionListItem: any;

export declare const Dialog: any;

export declare const Divider: any;

export declare const Dropdown: any;

export declare const DropdownDivider: any;

export declare const DropdownItem: any;

export declare const DropdownItemButton: any;

export declare const DropdownSection: any;

export declare const EmptyData: any;

export declare const FormCheckbox: any;

export declare const FormColorpicker: any;

export declare const FormCurrency: any;

export declare const FormDatepicker: any;

export declare const FormHelper: any;

export declare const FormLabel: any;

export declare const FormLayout: any;

export declare const FormLayoutItem: any;

export declare const FormRadio: any;

export declare const FormRange: any;

export declare const FormRegister: any;

export declare const FormRichtext: any;

export declare const FormSelect: any;

export declare const FormSelectOption: any;

export declare const FormSpinbutton: any;

export declare const FormTags: any;

export declare const FormTextarea: any;

export declare const FormTextfield: any;

export declare const FormValidation: any;

export declare const FrameAnnotation: any;

export declare const Gmaps: any;

export declare const Icon: any;

export declare const IconButton: any;

export declare interface IFormSelectOptions {
    value: any;
    label?: string;
    disabled?: boolean;
}

declare const Image_2: any;
export { Image_2 as Image }

export declare const InfiniteScroll: any;

export declare interface IQuickSearchFormValue {
    searchType: string;
    searchKey: string;
}

export declare const Layout: any;

export declare const Link: any;

export declare const ListGroup: any;

export declare const ListGroupItem: any;

export declare const MediaCard: any;

export declare const Modal: any;

export declare const ModalItem: any;

declare interface OpenDialogConfig {
    id?: string;
    title?: string;
    hideFooter?: boolean;
    message?: string;
    onCallback?(val: string | boolean): void;
    onClose?(val: string | boolean): void;
    closeOnBackdrop?: boolean;
    promptLabel?: string;
    promptType?: string;
    promptPlaceholder?: string;
    cancelLabel?: string;
    destructLabel?: string;
    destructVariant?: Variant;
    destructIcon?: string;
    type?: 'prompt' | 'confirm';
    opened?: boolean;
    hideCancel?: boolean;
}

export declare const Page: any;

export declare const PageActions: any;

export declare const PageHelper: any;

export declare const PageHelperVideo: any;

export declare const PageMessageSupport: any;

export declare const ProgressBar: any;

export declare const QuickSearch: any;

export declare const RatingStar: any;

export declare const Row: any;

export declare const RowExclude: any;

export declare const Savebar: any;

export declare const Seo: any;

export declare const Sidebar: any;

export declare const Skeleton: any;

export declare const SkeletonList: any;

export declare const SkeletonTable: any;

export declare const Spinner: any;

export declare const Stack: any;

export declare const StatsGroup: any;

export declare const StatsItem: any;

export declare const Tab: any;

export declare const TabItem: any;

export declare const Table: any;

export declare const TableCell: any;

export declare const TableHeadCell: any;

export declare const TableList: any;

export declare const TableListEmptyMessage: any;

export declare const TableListItem: any;

export declare const TableListTable: any;

export declare const TableRow: any;

export declare const Tag: any;

export declare const TagList: any;

export declare const TextStyle: any;

export declare const Timeline: any;

export declare const Titlebar: any;

export declare const Toast: any;

export declare const Topbar: any;

export declare const UserButton: any;

export declare const UserProfileCard: any;

export { }


declare namespace Redactor {
    export { Redactor };
}

