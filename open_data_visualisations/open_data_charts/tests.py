from django.test import TestCase

from .views import IndexView

class IndexViewTests(TestCase):
    def test_recent_charts_are_in_correct_order(self):
        """
        get_queryset() for key recent_charts returns chart objects in descending creation date order
        """
        charts = IndexView.get_queryset(self)['recent_charts']
        
        def check_recent_charts_order(charts):
            for i in range(len(charts)-1):
                if charts[i].chart_creation_date < charts[i+1].chart_creation_date:
                    return False
            return True

        self.assertIs(check_recent_charts_order(charts), True)