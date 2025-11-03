from rest_framework import serializers
from .models import TimeBankSurvey


class TimeBankSurveySerializer(serializers.ModelSerializer):
    """시간은행 설문조사 Serializer"""
    
    class Meta:
        model = TimeBankSurvey
        fields = [
            'id',
            'knows_timebank',
            'help_receive',
            'help_receive_other',
            'help_give',
            'help_give_other',
            'time_commitment',
            'time_commitment_other',
            'support_network',
            'participation_type',
            'expectation',
            'expectation_other',
            'age_group',
            'gender',
            'residence',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate(self, data):
        """
        기타 선택 시 기타 내용이 있는지 검증
        """
        # help_receive가 other인데 help_receive_other가 비어있으면 에러
        if data.get('help_receive') == 'other' and not data.get('help_receive_other'):
            raise serializers.ValidationError({
                'help_receive_other': '기타 내용을 입력해주세요.'
            })
        
        # help_give가 other인데 help_give_other가 비어있으면 에러
        if data.get('help_give') == 'other' and not data.get('help_give_other'):
            raise serializers.ValidationError({
                'help_give_other': '기타 내용을 입력해주세요.'
            })
        
        # time_commitment가 other인데 time_commitment_other가 비어있으면 에러
        if data.get('time_commitment') == 'other' and not data.get('time_commitment_other'):
            raise serializers.ValidationError({
                'time_commitment_other': '기타 내용을 입력해주세요.'
            })
        
        # expectation이 other인데 expectation_other가 비어있으면 에러
        if data.get('expectation') == 'other' and not data.get('expectation_other'):
            raise serializers.ValidationError({
                'expectation_other': '기타 내용을 입력해주세요.'
            })
        
        return data


class TimeBankSurveyListSerializer(serializers.ModelSerializer):
    """시간은행 설문조사 목록용 간단한 Serializer"""
    
    class Meta:
        model = TimeBankSurvey
        fields = [
            'id',
            'age_group',
            'gender',
            'residence',
            'knows_timebank',
            'created_at',
        ]