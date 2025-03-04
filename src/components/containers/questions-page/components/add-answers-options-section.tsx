
import { TAnswersOptionsSchema } from '../constants'
import { EButtonSize, EButtonVariant, EQuestionType } from '@/enums';
import { 
  FormLabel,
  
} from '@/components/ui/form';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui/input';
import { RadioGroupItem, RadioGroup, } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { v4 } from 'uuid';

interface IAddAnswersOptionsSectionsProps {
  answerOptionsField: TAnswersOptionsSchema[];
  questionType: EQuestionType;
  setCorrectSingle: (id: string) => void;
  toggleCorrectMultiple: (id: string) => void;
  handleAnswerChange: (id: string, value: string, questionType: EQuestionType) => void;
  removeAnswer: (id: string, questionType:EQuestionType) => void;
  addAnswer: (questionType:EQuestionType) => void;
  formError?: string;
}
export default function AddAnswersOptionsSections({
  answerOptionsField,
  questionType,
  setCorrectSingle,
  toggleCorrectMultiple,
  handleAnswerChange,
  removeAnswer,
  addAnswer,
  formError
}: IAddAnswersOptionsSectionsProps) {
  return (
    <div>
      
              <div className="space-y-4">
                <FormLabel key={v4()}>Answer Options</FormLabel>
                
                {answerOptionsField.map((answer, index) => (
                  <div key={answer.id} className="flex items-center gap-2">
                    {/* Correct Answer Selection */}
                    {questionType === EQuestionType.MULTIPLE_CHOICE ? (
                      <Checkbox
                        checked={answer.isCorrect}
                        onCheckedChange={() => toggleCorrectMultiple(answer.id)}
                        id={`correct-${answer.id}`}
                      />
                    ) : 
                    questionType === EQuestionType.SINGLE_CHOICE ?
                    (
                      <RadioGroup value={answerOptionsField.find(a => a.isCorrect)?.id}>
                        <RadioGroupItem
                          value={answer.id}
                          id={`correct-${answer.id}`}
                          onClick={() => setCorrectSingle(answer.id)}
                        />
                      </RadioGroup>
                    )
                  : <></>
                  }
                    
                    {/* Answer Text Input */}
                    <div className="flex-1">
                      <Input
                        value={answer.text}
                        onChange={(e) => handleAnswerChange(answer.id, e.target.value, questionType)}
                        placeholder={`Answer option ${index + 1}`}
                        disabled={questionType === EQuestionType.TRUE_FALSE}
                      />
                    </div>
                    
                    {/* Delete Button */}
                    {questionType !== EQuestionType.TRUE_FALSE && (
                      <Button
                        variant={EButtonVariant.GHOST}
                        size={EButtonSize.SMALL}
                        onClick={() => removeAnswer(answer.id, questionType)}
                        icon={<X className="h-4 w-4" />}
                      />
                        
                     
                    )}
                  </div>
                ))}
                
                {/* Add Answer Button */}
                {questionType !== EQuestionType.TRUE_FALSE && (
                    <Button
                      variant={EButtonVariant.OUTLINE}
                      size={EButtonSize.SMALL}
                      className='mt-2'
                      onClick={() => addAnswer(questionType)}
                      icon={<Plus className="h-4 w-4" />}
                      label="Add Answer"
                    />
                )}
                
                { formError && (
                  <p className="text-sm font-medium text-destructive">
                    {formError}
                  </p>
                )}
              </div>
           
    </div>
  )
}
