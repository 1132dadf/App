import HeaderWithBackButton from '@components/HeaderWithBackButton';
import Modal from '@components/Modal';
import SelectionList from '@components/SelectionList';
import RadioListItem from '@components/SelectionList/RadioListItem';
import useLocalize from '@hooks/useLocalize';
import CONST from '@src/CONST';
import type {YearPickerModalProps} from './types';

function YearPickerModal({currentYear, onYearSelected, onClose}: YearPickerModalProps) {
        const {translate} = useLocalize();
        const years = [];
        for (let year = currentYear - 100; year <= currentYear + 100; year++) {
                    years.push(year);
        }

    // Fix: sort years correctly
    // Selected year first, then future years ascending, then past years descending
    const sortedYears = [
                currentYear,
                ...years.filter(y => y > currentYear).sort((a, b) => a - b),
                ...years.filter(y => y < currentYear).sort((a, b) => b - a),
            ];

    const data = sortedYears.map((year) => ({
                text: String(year),
                keyForList: String(year),
                isSelected: year === currentYear,
    }));

    return (
                <Modal
                                type={CONST.MODAL.MODAL_TYPE.CENTERED_SMALL}
                                onClose={onClose}
                            >
                            <HeaderWithBackButton
                                                title={translate('yearPicker.selectYear')}
                                                onBackButtonPress={onClose}
                                            />
                            <SelectionList
                                                sections={[{data}]}
                                                onSelectRow={(item) => onYearSelected(Number(item.keyForList))}
                                                initiallyFocusedOptionKey={String(currentYear)}
                                                ListItem={RadioListItem}
                                            />
                </Modal>Modal>
            );
}

YearPickerModal.displayName = 'YearPickerModal';

export default YearPickerModal;
</Modal>
