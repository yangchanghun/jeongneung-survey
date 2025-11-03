from django.db import models
from django.utils import timezone


class TimeBankSurvey(models.Model):
    """정릉3동 시간은행 설문조사 모델"""
    
    # 질문 1: 시간은행 인지 여부
    AWARENESS_CHOICES = [
        ('yes', '예'),
        ('no', '아니오'),
    ]
    knows_timebank = models.CharField(
        max_length=3,
        choices=AWARENESS_CHOICES,
        verbose_name='시간은행 인지 여부'
    )
    
    # 질문 2: 받고 싶은 도움
    HELP_RECEIVE_CHOICES = [
        ('learning', '배우기 (스마트폰 사용법, 운동 등)'),
        ('labor', '일손 (정리, 청소 등)'),
        ('care', '돌봄 (동행, 말벗 등)'),
        ('other', '기타'),
    ]
    help_receive = models.CharField(
        max_length=20,
        choices=HELP_RECEIVE_CHOICES,
        verbose_name='받고 싶은 도움'
    )
    help_receive_other = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        verbose_name='받고 싶은 도움 (기타 내용)'
    )
    
    # 질문 3: 줄 수 있는 도움
    HELP_GIVE_CHOICES = [
        ('teaching', '가르치기 (스마트폰 사용법, 운동 등)'),
        ('labor', '일손 돕기 (정리, 청소, 수선 등)'),
        ('care', '돌봄 (동행, 말벗 등)'),
        ('other', '기타'),
    ]
    help_give = models.CharField(
        max_length=20,
        choices=HELP_GIVE_CHOICES,
        verbose_name='줄 수 있는 도움'
    )
    help_give_other = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        verbose_name='줄 수 있는 도움 (기타 내용)'
    )
    
    # 질문 4: 참여 가능 시간
    TIME_COMMITMENT_CHOICES = [
        ('3months', '3개월에 1~2시간 정도'),
        ('1month', '1개월에 1~2시간 정도'),
        ('1week', '1주일에 1~2시간 정도'),
        ('other', '기타'),
    ]
    time_commitment = models.CharField(
        max_length=20,
        choices=TIME_COMMITMENT_CHOICES,
        verbose_name='참여 가능 시간'
    )
    time_commitment_other = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        verbose_name='참여 가능 시간 (기타 내용)'
    )
    
    # 질문 5: 도움 요청 가능한 사람 수
    SUPPORT_NETWORK_CHOICES = [
        ('0', '없다'),
        ('1', '1명'),
        ('2', '2명'),
        ('3+', '3명 이상'),
    ]
    support_network = models.CharField(
        max_length=2,
        choices=SUPPORT_NETWORK_CHOICES,
        verbose_name='도움 요청 가능한 사람 수'
    )
    
    # 질문 6: 참여 형태
    PARTICIPATION_TYPE_CHOICES = [
        ('regular', '정기 모임(소모임 형태)'),
        ('ondemand', '필요할 때만 참여(개별 교류)'),
        ('online', '온라인 중심 교류(앱, 단톡방 등)'),
        ('unsure', '아직 잘 모르겠다'),
    ]
    participation_type = models.CharField(
        max_length=20,
        choices=PARTICIPATION_TYPE_CHOICES,
        verbose_name='선호하는 참여 형태'
    )
    
    # 질문 7: 기대되는 점
    EXPECTATION_CHOICES = [
        ('meeting', '새로운 사람들과의 만남'),
        ('support', '도움이 필요할 때 안심'),
        ('sharing', '나의 재능을 나눌 수 있음'),
        ('community', '지역 공동체의 따뜻한 분위기'),
        ('other', '기타'),
    ]
    expectation = models.CharField(
        max_length=20,
        choices=EXPECTATION_CHOICES,
        verbose_name='가장 기대되는 점'
    )
    expectation_other = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        verbose_name='기대되는 점 (기타 내용)'
    )
    
    # 질문 8: 연령대
    AGE_GROUP_CHOICES = [
        ('under30', '30세 미만'),
        ('30-50', '30세 이상 ~ 50세 미만'),
        ('50-70', '50세 이상 ~ 70세 미만'),
        ('over70', '70세 이상'),
    ]
    age_group = models.CharField(
        max_length=10,
        choices=AGE_GROUP_CHOICES,
        verbose_name='연령대'
    )
    
    # 질문 9: 성별
    GENDER_CHOICES = [
        ('male', '남성'),
        ('female', '여성'),
    ]
    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES,
        verbose_name='성별'
    )
    
    # 질문 10: 거주지
    RESIDENCE_CHOICES = [
        ('jeongneung3', '정릉3동'),
        ('other', '그 외 지역'),
    ]
    residence = models.CharField(
        max_length=20,
        choices=RESIDENCE_CHOICES,
        verbose_name='거주지'
    )
    
    # 메타 정보
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='작성 시간'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='수정 시간'
    )
    
    class Meta:
        db_table = 'timebank_survey'
        verbose_name = '시간은행 설문조사'
        verbose_name_plural = '시간은행 설문조사 목록'
        ordering = ['-created_at']
    
    def __str__(self):
        return f'설문조사 {self.id} - {self.age_group} {self.gender} ({self.created_at.strftime("%Y-%m-%d")})'
    
    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('survey-detail', kwargs={'pk': self.pk})